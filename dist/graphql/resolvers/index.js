import queries from "./queries.js";
import mutations from "./mutations.js";
export default {
    Query: {
        ...queries,
    },
    Mutation: {
        ...mutations,
    },
};
