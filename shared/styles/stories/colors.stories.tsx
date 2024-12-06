import type { Meta, StoryObj as Story } from '@storybook/react'

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

interface ColorBoxProps {
  shade: string
  hex: string
}

const ColorBox = ({ shade, hex }: ColorBoxProps) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: '80px',
        height: '80px',
        marginBottom: '8px',
        border: '1px solid #ececec',
        borderRadius: '6px',
        backgroundColor: hex,
      }}
    />
    <div style={{ marginBottom: '4px', fontSize: '14px' }}>{shade}</div>
    <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#797979' }}>
      {hex.toUpperCase()}
    </div>
  </div>
)

interface ColorSectionProps {
  title: string
  colors: Array<{ shade: string; hex: string }>
}

const ColorSection = ({ title, colors }: ColorSectionProps) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '500' }}>{title}</h2>
    <div style={{ display: 'flex', gap: '12px' }}>
      {colors.map(({ shade, hex }) => (
        <ColorBox key={`${title}-${shade}`} shade={shade} hex={hex} />
      ))}
    </div>
  </div>
)

export const Colors: Story = {
  render: () => (
    <>
      <h1 style={{ margin: '24px 0', fontSize: '32px', fontWeight: 'bold' }}>Colors</h1>

      <ColorSection
        title="Grayscale"
        colors={[
          { shade: 'white', hex: '#ffffff' },
          { shade: '100', hex: '#fafafa' },
          { shade: '200', hex: '#ececec' },
          { shade: '300', hex: '#cccccc' },
          { shade: '400', hex: '#a7a7a7' },
          { shade: '500', hex: '#797979' },
          { shade: '600', hex: '#4d4d4d' },
          { shade: '700', hex: '#363636' },
          { shade: '800', hex: '#1d1d1d' },
          { shade: 'black', hex: '#0a0a0a' },
        ]}
      />
      <ColorSection
        title="Primary (Orange)"
        colors={[
          { shade: '100', hex: '#ffdfd6' },
          { shade: '200', hex: '#ffbfad' },
          { shade: '300', hex: '#ffaf99' },
          { shade: '400', hex: '#ff8f70' },
          { shade: '500', hex: '#ff7752' },
          { shade: '600', hex: '#ff5f33' },
          { shade: '700', hex: '#ff4f1f' },
          { shade: '800', hex: '#f53500' },
        ]}
      />
      <ColorSection
        title="Feedback"
        colors={[
          { shade: 'yellow', hex: '#ffe070' },
          { shade: 'indigo', hex: '#6877ff' },
        ]}
      />
    </>
  ),
}

export default meta
