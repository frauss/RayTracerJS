class Intersections extends Array {

    hit() {
        let firstHit = this.map((intersection, index) => {
            return {
                tValue: this[index].t,
                indexValue: index
            }
        }).sort((first, second) => {
            if (first.tValue < second.tValue)
                return -1;
            else if (first.tValue > second.tValue)
                return 1;
            else
                return 0;
        }).find(intersection => {
            return intersection.tValue > 0;
        });
        if (firstHit)
            return this[firstHit.indexValue];
        else
            return null;
    }
}

module.exports = (Intersections);