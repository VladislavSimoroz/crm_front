export const state = () => ({
    // active nodes path
    nodes: [],
})

export const mutations = {
    update_nodes(state, nodes) {
        state.nodes = nodes
    },
}

