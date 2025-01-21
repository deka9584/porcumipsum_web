import fetchPorks from "./fetchPorks";
import pickRandom from "./pickRandom";

async function porcumGenerator (nPar, parLength, commasCheck) {
    const start = await fetchPorks('start');
    const preImprecazioni = await fetchPorks('imprecazioni_pre');
    const santi = await fetchPorks('santi');
    const postImprecazioni = await fetchPorks('imprecazioni_post');
    const lists = { start, preImprecazioni, santi, postImprecazioni };

    if (Object.values(lists).some(l => !Array.isArray(l))) {
        throw new Error("Unable to fetch all lists");
    }

    const paragraphs = [];

    for (let i = 0; i < nPar; i++) {
        let par = "";

        if (i === 0) {
            par += pickRandom(lists.start);
        }

        while (par.length < parLength) {
            if (par.length === 0) {
                par += `${pickRandom(lists.preImprecazioni)} ${pickRandom(lists.santi)} ${pickRandom(lists.postImprecazioni).toLowerCase()}`;
            }

            if (commasCheck) {
                par += `,`;
            }

            par += ` ${pickRandom(lists.preImprecazioni).toLowerCase()} ${pickRandom(lists.santi)} ${pickRandom(lists.postImprecazioni).toLowerCase()}`;
        }

        par += ".";
        paragraphs.push(par);
    }

    return paragraphs;
}

export default porcumGenerator;