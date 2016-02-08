/*global describe, it, expect*/

import {Area} from 'grouped-markers/helper/Area.js';
import {Point} from 'grouped-markers/helper/Point.js';

describe('Area', () => {
    'use strict';

    it('Should start at (0,0)', () => {
        let a = new Area();

        expect(a.center.x).toBe(0);
        expect(a.center.y).toBe(0);
        expect(a.topRight.x).toBe(0);
        expect(a.topRight.y).toBe(0);
        expect(a.bottomLeft.x).toBe(0);
        expect(a.bottomLeft.y).toBe(0);
    });

    it('Topleft and bottomright should be set with the size', () => {
        let a = new Area(5);

        expect(a.center.x).toBe(0);
        expect(a.center.y).toBe(0);
        expect(a.topRight.x).toBe(5);
        expect(a.topRight.y).toBe(-5);
        expect(a.bottomLeft.x).toBe(-5);
        expect(a.bottomLeft.y).toBe(5);
    });

    it('The center should always be the average', () => {
        let a = new Area();

        expect(a.center.x).toBe(0);
        expect(a.center.y).toBe(0);

        a.add(new Point(1, 1));

        expect(a.center.x).toBe(1);
        expect(a.center.y).toBe(1);

        a.add(new Point(1, 1));

        expect(a.center.x).toBe(1);
        expect(a.center.y).toBe(1);

        a.add(new Point(4, 4));

        expect(a.center.x).toBe(2);
        expect(a.center.y).toBe(2);

        a.remove(new Point(4, 4));

        expect(a.center.x).toBe(1);
        expect(a.center.y).toBe(1);
    });

    it('Find a points index', () => {
        let a = new Area();

        a.add(new Point(1, 1));
        a.add(new Point(1, 1));
        a.add(new Point(4, 4));

        expect(a.getIndex(new Point(1, 1))).toBe(0);
    });

    it('Get the number of points', () => {
        let a = new Area();

        expect(a.length).toBe(0);
        a.add(new Point(1, 1));
        expect(a.length).toBe(1);
        a.add(new Point(1, 1));
        expect(a.length).toBe(2);
        a.add(new Point(4, 4));
        expect(a.length).toBe(3);
        a.remove(new Point(4, 4));
        expect(a.length).toBe(2);
    });
});