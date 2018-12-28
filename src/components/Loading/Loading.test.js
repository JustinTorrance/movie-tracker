import React from 'react'
import { shallow } from 'enzyme'
import Loading from './Loading'


describe('Loading', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Loading />
    );
  })

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
})