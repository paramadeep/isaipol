import { render, screen } from '@testing-library/react'
import Blocks from './blocks'

test('given a list of domain block, they should be rendered', () => {
  render(<Blocks domainBlocks="123"/>)
  screen.getByText(/123/i)
  expect(1).toBe(1)
})
