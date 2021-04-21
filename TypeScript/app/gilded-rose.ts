export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateSellIn() {
        this.sellIn--;
    }

    calculateQuality() {
        let quality = this.quality;

        if(this.sellIn <= 0) {
            // Once the sell by date has passed, Quality degrades twice as fast
            quality = this.quality - 2;
        } else {
            quality--;
        }

        this.updateQuality(quality);
    }

    updateQuality(quality) {
        // The Quality of an item is never negative
        //  The Quality of an item is never more than 50
        this.quality = Math.min(Math.max(0, quality), 50);
    }

    update() {
        // At the end of each day our system lowers both values for every item
        this.calculateQuality();
        this.updateSellIn();
    }
}

export class AgedBrie extends Item {
    // "Aged Brie" actually increases in Quality the older it gets
    calculateQuality() {
        this.updateQuality(this.quality + 1);
    }
}

export class Sulfuras extends Item {
    // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    update() {}
}

export class BackstagePass extends Item {
    calculateQuality() {
        // Quality drops to 0 after the concert
        if(this.sellIn <= 0) {
            this.updateQuality(0);
        // Quality increases by 3 when there are 5 days or less
        } else if(this.sellIn < 5) {
            this.updateQuality(this.quality + 3);
        // Quality increases by 2 when there are 10 days or less
        } else if(this.sellIn < 10) {
            this.updateQuality(this.quality + 2);
        }
        // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
        else this.updateQuality(this.quality + 1);
    }
}

export class Conjured extends Item {
    calculateQuality() {
        // "Conjured" items degrade in Quality twice as fast as normal items
        this.updateQuality(this.quality - 2);
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            item.update();
        }
    }
}
