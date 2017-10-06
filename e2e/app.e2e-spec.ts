import { ClientDemoApp1Page } from './app.po';

describe('client-demo-app1 App', function() {
  let page: ClientDemoApp1Page;

  beforeEach(() => {
    page = new ClientDemoApp1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
