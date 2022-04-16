import reducer from './reducer';

import { changeRestaurantField, setRestaurants } from './actions';

import restaurants from '../fixtures/restaurants';
import restaurant from '../fixtures/restaurant';

describe('Reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setRestaurants', () => {
    const initialState = {
      restaurants: [],
    };

    it('returns restaurants to array', () => {
      const state = reducer(initialState, setRestaurants(restaurants));

      expect(state.restaurants).not.toHaveLength(0);
    });
  });

  describe('changeRestaurantField', () => {
    const initialState = {
      restaurant,
    };
    it('return change restaurant field value', () => {
      const state = reducer(initialState, changeRestaurantField({ name: 'address', value: '서울시 종로구' }));

      expect(state.restaurant.address).toBe('서울시 종로구');
    });
  });
});
