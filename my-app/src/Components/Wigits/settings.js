const baseSettings = {

    details: {
        state: "Wedding Plans",
        wedding: {
            state: 0,
            plans: 0,
            clothing: 0,
            style: 0,
            color: 0
           
        },
        person1: {
            state: 0,
            details: 0,
            dietry: 0,
            clothing: 0
          
        },
        person2: {
            state: 0,
            details: 0,
            dietry: 0,
            clothing: 0
         
        }
    },
    tasks: {
        filter: {
            state: "All",
            activity: ""
        },
        sort: {
            taskSortedBy: "taskName",
            taskGroupedBy: "none",
            taskSorted: "asc"
        }
    },
    suppliers: {
        filter: {
            state: "All",
            type: "All"
        },
        sort: {
            supplierSortedBy: "All",
            supplierSorted: "asc"
        }
    },
    guestList: {
        filter: {
            listType: "Primary guests",
            state: "All"
        },
        sort: {
            guestSortedBy: "taskName",
            guestSorted: "asc"
        }
    }

};

export default baseSettings;