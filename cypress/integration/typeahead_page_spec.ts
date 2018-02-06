import { TypeaheadPo } from '../support/typeahead.po';

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();
  const typeaheadTitles = typeahead.exampleTitlesArr;
  const typeaheadDemos = typeahead.exampleDemosArr;

  beforeEach(() => typeahead.navigateTo());

  it('typeahead page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to typeahead component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', typeahead.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', typeahead.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', typeahead.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('reactive forms typeahead appears after focus at input', () => {
    cy.get(typeaheadDemos[4]).as('reactiveForm').find('input').focus();
    cy.get('@reactiveForm')
      .should('to.have.descendants', 'typeahead-container');
  });

  it('each demo examples are not mixed up with each other and contains code examples', () => {
    cy.get('examples').find('h3').as('exampleTitles').each(($title, i) => {
      expect($title).to.contain(typeaheadTitles[i]);

      cy.get('@exampleTitles').contains(typeaheadTitles[i]).parent().as('currentBlock');

      cy.get('@currentBlock').find(typeaheadDemos[i])
        .should('to.exist');
      cy.get('@currentBlock').find('.section').eq(1)
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });
});
