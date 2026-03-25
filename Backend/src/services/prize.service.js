export const calculatePrize = (winners, prizePool) => {
    const distribution = {
        5: 0.4,
        4: 0.35,
        3: 0.25,
        2: 0.15,
        1: 0.1
    }

    let result = []

    for (let match of [5,4,3,2,1]) {
        const group = winners.filter(w => w.matchCount === match)

        if (group.length > 0) {
            const total = prizePool * (distribution[match] || 0.05)
            const perUser = total / group.length

            group.forEach(w => {
                result.push({
                    ...w,
                    prizeAmount: Math.floor(perUser)
                })
            })
        }
    }

    return result
}