export const state = () => {
    return [];
}

export const mutations = {
    create(state, message) {
        let msg = {
            id: message.id,
            text: message.text,
            title: message.title,
            color: message.color,
            created_at: new Date()
        }
        state.push(msg);
    },
    remove(state, id) {
        const index = state.findIndex(item => item.id === id);
        if (index !== -1) {
            state.splice(index, 1);
        }
    },
}