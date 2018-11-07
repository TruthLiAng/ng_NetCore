import { ngDemoTemplatePage } from './app.po';

describe('ngDemo App', function() {
  let page: ngDemoTemplatePage;

  beforeEach(() => {
    page = new ngDemoTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
