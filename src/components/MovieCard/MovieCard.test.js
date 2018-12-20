import React from 'react'
import { shallow } from 'enzyme'
import MovieCard from './MovieCard'

describe('MovieCard', () => {
  it('should match the snapshot with all data passed in correctly', () => {
    const mockMovieData = {
      id: 1,
      title: 'Titanic',
      year: 1999,
      rating: 9,
      posterPic: 'https://image.tmdb.org/t/p/w500///',
      backdropPic: 'https://image.tmdb.org/t/p/w500///',
      overview: 'great movie',
      genres: 'drama',
      runtime: 50
    }

    const wrapper = shallow(
      <MovieCard movie={mockMovieData} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});