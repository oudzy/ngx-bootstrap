import { TooltipPo } from '../support/tooltip.po';

describe('Tooltip demo page test suite', () => {
  const tooltip = new TooltipPo();
  const tooltipTitles = tooltip.exampleTitlesArr;
  const tooltipDemos = tooltip.exampleDemosArr;

  beforeEach(() => tooltip.navigateTo());

  it('tooltip page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to tooltip component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', tooltip.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', tooltip.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', tooltip.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic tooltip appears after hovering on trigger button', () => {
    cy.get(tooltipDemos[0]).as('basicDemo').children('.btn').focus();
    cy.get('@basicDemo')
      .should('to.have.descendants', 'bs-tooltip-container');
  });

  it('each demo examples are not mixed up with each other and contains code examples', () => {
    cy.get('examples').find('h3').as('exampleTitles').each(($title, i) => {
      expect($title).to.contain(tooltipTitles[i]);

      cy.get('@exampleTitles').contains(tooltipTitles[i]).parent().as('currentBlock');

      cy.get('@currentBlock').find(tooltipDemos[i])
        .should('to.exist');
      cy.get('@currentBlock').find('.section').eq(1)
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });
});
