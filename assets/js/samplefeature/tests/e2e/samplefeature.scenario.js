describe('When accessing the sample features', function() {

  beforeEach(function() {
    browser.get('/');
  });

  it('the default url should be set correctly', function() {
    expect(browser.getLocationAbsUrl()).toEqual('/');
  });

  it('clicking the next page button should redirect to the correct page', function() {
    $('a').click();
    expect(browser.getLocationAbsUrl()).toEqual('/page2');
    expect(element(by.tagName('h2')).getText()).toEqual('Page 2');
  });
});
