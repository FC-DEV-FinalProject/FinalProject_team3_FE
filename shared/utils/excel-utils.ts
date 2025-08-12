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
        validateHeaders(header)

        const rows: RowDataModel[] = jsonData
          .slice(1)
          .filter((row) => row.length >= 3)
          .map((row) => ({
            date: parseExcelDate(row[0] ?? ''),
            transaction: Number(row[1] ?? 0),
            dailyProfitLoss: Number(row[2] ?? 0),
          }))

        resolve(rows)
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(new Error('파일 읽기 실패'))
    reader.readAsArrayBuffer(file)
  })
}

const parseExcelDate = (excelDate: number | string | null): string => {
  if (excelDate === null) return ''

  const dateStr = String(excelDate).replace(/[^0-9]/g, '')
  if (dateStr.length === 8) {
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return `${year}-${month}-${day}`
  }

  if (typeof excelDate === 'number') {
    const date = XLSX.SSF.parse_date_code(excelDate)
    const year = date.y
    const month = String(date.m).padStart(2, '0')
    const day = String(date.d).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return String(excelDate)
}

const validateHeaders = (header: (string | number | null)[]) => {
  const requiredHeaders = ['일자', '입출금', '일손익']

  const missingHeaders = requiredHeaders.filter(
    (requiredHeader) => !header.some((h) => h?.toString().includes(requiredHeader))
  )

  if (missingHeaders.length > 0) {
    throw new Error(`다음 헤더를 포함해야 합니다: ${missingHeaders.join(', ')}`)
  }
}
