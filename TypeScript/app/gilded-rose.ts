export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    decreaseSellIn() {
        this.sellIn--;
    }

    decreaseQuality() {
        let quality = this.quality;

        if(this.sellIn <= 0) {
            // Once the sell by date has passed, Quality degrades twice as fast
            quality = this.quality - 2;
        } else {
            quality--;
        }

        // The Quality of an item is never negative
        this.quality = Math.max(0, quality);
    }

    updateQuality() {
        // At the end of each day our system lowers both values for every item
        this.decreaseQuality();
        this.decreaseSellIn();
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            item.updateQuality();
        }
    }
}
