import React from 'react'
import { shallow } from 'enzyme'
import { ErrorPage, mapDispatchToProps } from './ErrorPage'
import { catchError } from '../../actions/index'


describe('Loading', () => {
  let wrapper;
  const mockReturnToSite = jest.fn()

  beforeAll(() => {
    wrapper = shallow(
      <ErrorPage returnToSite={mockReturnToSite}/>
    )
  })

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call returnToSite when the button is clicked', () => {
    wrapper.find('.return-to-site-btn').simulate('click')
    expect(mockReturnToSite).toHaveBeenCalled()
  })
})

describe('MapDispatchToProps', () => {
  it('Calls dispatch with a signOut action', () => {
    const mockDispatch = jest.fn()
    const actionToDispatch = catchError(false)
    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.returnToSite(false)
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
})