// setupTests.js
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
beforeEach(() => {
 const div = document.createElement('div');
 div.id = 'root';
 document.body.appendChild(div);
});
  jest.mock('react-modal', () => ({
    ...jest.requireActual('react-modal'),
    setAppElement: () => {},
  }));
