import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Home } from './Home'

test('Text content example', () => {
  const { container } = render(<Home />)
  expect(container).toHaveTextContent('Wellcome!!!')
})