import { fromLonLat } from 'ol/proj.js';
import 'cypress-real-events/support.js';

describe('Map Application', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('/');
  });

  it('should display popup on point click and allow status change', () => {
    cy.window().its('map').should('exist');
    cy.window().its('vectorSource').should('exist');

    cy.window().then((win) => {
      const map = win.map;
      const longitude = 58.674264;
      const latitude = 25.543009;

      const coordinate = fromLonLat([longitude, latitude]);

      const pixel = map.getPixelFromCoordinate(coordinate);

      cy.log(`Clicking at pixel coordinates: (${pixel[0]}, ${pixel[1]})`);

      cy.get('.map-container')
          .realClick({ x: pixel[0], y: pixel[1] });

      cy.get('.ol-popup').should('be.visible');

      cy.get('.ol-popup textarea')
          .clear()
          .type('Updated comment via Cypress test');

      cy.get('.ol-popup button').click();

      cy.get('.ol-popup').should('not.be.visible');

      cy.window().then((window) => {
        const coordinates = JSON.parse(window.localStorage.getItem('coordinates'));
        expect(coordinates).to.exist;
      });
    });
  });
});