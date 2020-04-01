export const minfn = (tp) => {
    // parseFloat(tp,16)

}
export const getTestTpList = (tpData) => {
    let flgA = 0,
        flgB = 0,
        listA = ['30', '34', '38'],
        listB = ['35', '37', '40'],
        deleteListA = ['31','32','33','35','36','37','39','40'],
        deleteListB = ['30','31','32','33','34','36','38','39']
    listA.forEach(item => {
        if (tpData[item]) {
            flgA += 1;
        }
    })
    listB.forEach(item => {
        if (tpData[item]) {
            flgB += 1;
        }
    })
    if (flgA > flgB) {
        deleteListA.forEach(item => {
            if (tpData[item]) {
                delete tpData[item]
            }
        })
        listA.forEach(item => {
            if (!tpData[item]) {
                tpData[item] = parseFloat(item, 10)- 0.02
            }
        })
    } else {
        deleteListB.forEach(item => {
            if (tpData[item]) {
                delete tpData[item]
            }
        })
        listB.forEach(item => {
            if (!tpData[item]) {
                tpData[item] = parseFloat(item, 10) - 0.01
            }
        })
    }
    return tpData
}