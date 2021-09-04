import reducer from './reducer';

import {
  addRestaurant,
  setRestaurants,
  updateInput,
} from './actions';

describe('reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('without an existed action', () => {
    const notExistedAction = jest.fn();

    notExistedAction.mockImplementation(() => ({
      type: 'notExistedAction',
    }));

    it('returns state not changed', () => {
      const state = reducer(undefined, notExistedAction());

      expect(state.newId).toBe(100);
      expect(state.nameText).toBe('');
      expect(state.categoryText).toBe('');
      expect(state.addressText).toBe('');
      expect(state.restaurants).toHaveLength(0);
    });
  });

  context('with an existed action', () => {
    describe('updateNameText', () => {
      it('changes a displayed name', () => {
        const state = reducer({
          nameText: '',
        }, updateInput('name', '성원각'));

        expect(state.nameText).toBe('성원각');
      });
    });

    describe('updateCategoryText', () => {
      it('changes a displayed category', () => {
        const state = reducer({
          categoryText: '',
        }, updateInput('category', '중식'));

        expect(state.categoryText).toBe('중식');
      });
    });

    describe('updateAddressText', () => {
      it('changes a displayed address', () => {
        const state = reducer({
          addressText: '',
        }, updateInput('address', '서울시 동작구'));

        expect(state.addressText).toBe('서울시 동작구');
      });
    });

    describe('addRestaurant', () => {
      function reduceAddRestaurant(nameText, categoryText, addressText) {
        return reducer({
          newId: 100,
          nameText,
          categoryText,
          addressText,
          restaurants: [],
        }, addRestaurant());
      }

      context('without restaurant infos', () => {
        it('Nothing happens', () => {
          const state = reduceAddRestaurant();

          expect(state.restaurants).toHaveLength(0);
        });
      });

      context('with restaurant infos', () => {
        it('appends a new restaurant into a list', () => {
          const state = reduceAddRestaurant('성원각', '중식', '서울시 동작구');

          expect(state.restaurants).toHaveLength(1);
          expect(state.restaurants[0].id).not.toBeUndefined();
          expect(state.restaurants[0].name).toBe('성원각');
          expect(state.restaurants[0].category).toBe('중식');
          expect(state.restaurants[0].address).toBe('서울시 동작구');
        });

        it('clears input values', () => {
          const state = reduceAddRestaurant('성원각', '중식', '서울시 동작구');

          expect(state.nameText).toBe('');
          expect(state.categoryText).toBe('');
          expect(state.addressText).toBe('');
        });
      });
    });

    describe('setRestaurants', () => {
      it('returns initial state', () => {
        const state = reducer({}, setRestaurants());

        expect(state.newId).toBe(100);
        expect(state.nameText).toBe('');
        expect(state.categoryText).toBe('');
        expect(state.addressText).toBe('');
        expect(state.restaurants).toHaveLength(0);
      });
    });
  });
});
