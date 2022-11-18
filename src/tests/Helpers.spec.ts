import checkImage from "../helper/checkImage"

describe('Testar os helpers', () => {
  it('Verificar o hlper checkImage', () => {
    const value = checkImage('dlldldf.png')
    expect(true).toEqual(value)
  })
})