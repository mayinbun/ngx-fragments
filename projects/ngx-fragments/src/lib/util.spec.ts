import { toFragmentEntries } from './util';

describe('Util', () => {

  describe('toFragmentEntries', () => {
    it('should return array of TransformedFragment objects', () => {
      const obj: any = {
        drawer: {
          containerComponent: 'drawerContainer',
          entries: [
            {
              key: 'first',
              type: 'DrawerComponent',
            },
            {
              key: 'second',
              type: 'DrawerComponent',
            },
          ],
        },
        modal: {
          containerComponent: 'modalContainer',
          entries: [
            {
              key: 'first',
              type: 'ModalComponent',
            },
            {
              key: 'second',
              type: 'ModalComponent',
            },
          ],
        },
      };


      const result = toFragmentEntries(obj);

      expect(result).toEqual([
        {
          containerComponent: 'drawerContainer',
          key: 'drawer:first',
          type: 'DrawerComponent',
        },
        {
          containerComponent: 'drawerContainer',
          key: 'drawer:second',
          type: 'DrawerComponent',
        },
        {
          containerComponent: 'modalContainer',
          key: 'modal:first',
          type: 'ModalComponent',
        },
        {
          containerComponent: 'modalContainer',
          key: 'modal:second',
          type: 'ModalComponent',
        },
      ] as any[]);

    });
  });
});
