import { expect } from 'chai';
import { Item, GildedRose, AgedBrie, Sulfuras, BackstagePass, Conjured } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    describe('updateQuality', function() {
        describe('Classical products', function() {

            it('should be able to create an empty new GildedRose', () => {
                const gildedRose = new GildedRose();
                expect(gildedRose.items).to.eql([]);
            })

            // At the end of each day our system lowers both values for every item
            it('should decrease quality', () => {
                const gildedRose = new GildedRose([
                    new Item("+5 Dexterity Vest", 10, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(9);
                expect(gildedRose.items[0].quality).to.equal(19);
            })

            // Once the sell by date has passed, Quality degrades twice as fast
            it('should decrease quality 2x faster when sellIn is negative', () => {
                const gildedRose = new GildedRose([
                    new Item("+5 Dexterity Vest", 5, 20)
                ]);
                // eleven days
                for(var i=0; i<10; i++) {
                    gildedRose.updateQuality();
                }
                expect(gildedRose.items[0].sellIn).to.equal(-5);
                expect(gildedRose.items[0].quality).to.equal(5);
            })

            // The Quality of an item is never negative
            it('should decrease quality until zero', () => {
                const gildedRose = new GildedRose([
                    new Item("+5 Dexterity Vest", 5, 20)
                ]);
                // twenty days
                for(var i=0; i<20; i++) {
                    gildedRose.updateQuality();
                }
                expect(gildedRose.items[0].sellIn).to.equal(-15);
                expect(gildedRose.items[0].quality).to.equal(0);
            })
        });

        describe('Aged Brie', function() {
            // "Aged Brie" actually increases in Quality the older it gets
            it('should increase quality the older it gets', () => {
                const gildedRose = new GildedRose([
                    new AgedBrie("Aged Brie", 5, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(4);
                expect(gildedRose.items[0].quality).to.equal(21);
            })

            it('should increase quality even if sellIn is negative', () => {
                const gildedRose = new GildedRose([
                    new AgedBrie("Aged Brie", -5, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(-6);
                expect(gildedRose.items[0].quality).to.equal(21);
            })

            // The Quality of an item is never more than 50
            it('should increase quality until 50 max', () => {
                const gildedRose = new GildedRose([
                    new AgedBrie("Aged Brie", 5, 45)
                ]);
                // eleven days
                for(var i=0; i<10; i++) {
                    gildedRose.updateQuality();
                }
                expect(gildedRose.items[0].sellIn).to.equal(-5);
                expect(gildedRose.items[0].quality).to.equal(50);
            })
        });

        describe('Sulfuras', function() {
            // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
            it('should not decrease neither quality nor sellIn', () => {
                const gildedRose = new GildedRose([
                    new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 20)
                ]);
                const items = gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(0);
                expect(gildedRose.items[0].quality).to.equal(20);
            })
        });

        describe('Backstage passes', function() {

            // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
            it('should increase quality as its SellIn value approaches', () => {
                const gildedRose = new GildedRose([
                    new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 15, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(14);
                expect(gildedRose.items[0].quality).to.equal(21);
            })

            // Quality increases by 2 when there are 10 days or less
            it('should increase quality 2x faster when there are 10 days or less', () => {
                const gildedRose = new GildedRose([
                    new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 8, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(7);
                expect(gildedRose.items[0].quality).to.equal(22);
            })

            // Quality increases by 3 when there are 5 days or less
            it('should increase quality 3x faster when there are 5 days or less', () => {
                const gildedRose = new GildedRose([
                    new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 4, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(3);
                expect(gildedRose.items[0].quality).to.equal(23);
            })

            // Quality drops to 0 after the concert
            it('should drop quality to zero when sellIn is zero or negative', () => {
                const gildedRose = new GildedRose([
                    new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 0, 20)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(-1);
                expect(gildedRose.items[0].quality).to.equal(0);
            })
        });

        describe('Conjured', function() {
            // "Conjured" items degrade in Quality twice as fast as normal items
            it('should decrease quality 2x faster as normal items', () => {
                const gildedRose = new GildedRose([
                    new Conjured("Conjured Mana Cake", 3, 6)
                ]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(2);
                expect(gildedRose.items[0].quality).to.equal(4);
            })
        });
    });

});
