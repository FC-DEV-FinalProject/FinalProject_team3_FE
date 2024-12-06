const StorybookMockContents = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100px',
            paddingLeft: '20px',
            marginBottom: '10px',
            background: '#f4f4f4',
            fontSize: '32px',
          }}
        >
          Scrollable Content {idx + 1}
        </div>
      ))}
    </>
  )
}

export default StorybookMockContents
