import * as XLSX from 'xlsx'

interface RowDataModel {
  date: string
  transaction: number
  dailyProfitLoss: number
}

export const processExcelFile = (file: File): Promise<RowDataModel[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (!e.target?.result) throw new Error('파일을 읽을 수 없습니다.')

        const data = new Uint8Array(e.target.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const jsonData: (string | number | null)[][] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        })

        const header = jsonData[0]
        if (!header || header[0] !== '일자' || header[1] !== '입출금' || header[2] !== '일일손익') {
          throw new Error('올바른 형식의 엑셀 파일이 아닙니다.')
        }

        const rows: RowDataModel[] = jsonData
          .slice(1)
          .filter((row) => row.length >= 3)
          .map((row) => ({
            date: parseExcelDate(row[0] as number),
            transaction: Number(row[1]),
            dailyProfitLoss: Number(row[2]),
          }))

        resolve(rows)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error('파일 읽기 실패'))
    reader.readAsArrayBuffer(file)
  })
}

const parseExcelDate = (excelDate: number): string => {
  if (typeof excelDate === 'number') {
    const date = XLSX.SSF.parse_date_code(excelDate)
    const year = date.y
    const month = String(date.m).padStart(2, '0')
    const day = String(date.d).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return String(excelDate)
}
