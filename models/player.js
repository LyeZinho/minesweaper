/*
Player contains:

    - Uid
    - Score
    - Time
*/


const Client = require("@replit/database");

const client = new Client();


class Player {
    constructor(uid) {
        this.uid = uid;
        this.score = score;
        this.time = time;
    }

    async save() {
        await client.set(this.uid, JSON.stringify(this));
    }

    static async load(uid) {
        return JSON.parse(await client.get(uid));
    }

    static async delete(uid) {
        await client.delete(uid);
    }

    static async getTop() {
        const top = await client.list();
        const topPlayers = [];
        for (const player of top) {
            topPlayers.push(await Player.load(player));
        }
        return topPlayers.sort((a, b) => b.score - a.score);
    }

    static async getTopTime() {
        const top = await client.list();
        const topPlayers = [];
        for (const player of top) {
            topPlayers.push(await Player.load(player));
        }
        return topPlayers.sort((a, b) => a.time - b.time);
    }

    static async getTopScore() {
        const top = await client.list();
        const topPlayers = [];
        for (const player of top) {
            topPlayers.push(await Player.load(player));
        }
        return topPlayers.sort((a, b) => b.score - a.score);
    }
}