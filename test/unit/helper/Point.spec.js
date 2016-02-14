/*global describe, it, expect*/

import {Point} from 'marker-clusterer/helper/Point.js';

describe('Point', () => {
    'use strict';

    it('x and y are set with the constructor', () => {
        let p = new Point(1, 2);

        expect(p.x).toBe(1);
        expect(p.y).toBe(2);
    });

    it('Two points can be added', () => {
        let p1 = new Point(1, 2),
            p2 = new Point(4, 8),
            p3 = p1.add(p2);

        expect(p3.x).toBe(5);
        expect(p3.y).toBe(10);
        expect(p1 === p3).toBeFalsy();
    });

    it('A point can be cloned', () => {
        let p1 = new Point(4, 8),
            p2 = p1.clone();

        expect(p1 === p2).toBe(false);
        expect(p1.x === p2.x).toBe(true);
        expect(p1.y === p2.y).toBe(true);
    })
});