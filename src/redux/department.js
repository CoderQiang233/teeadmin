
const initstate = {
    departmentList: [],
    departments: []
}

function department(state = initstate, { type, payload }) {

    switch (type) {
        case 'department/showLoading':
            return {
                ...state,
                loading: true,
            }
        case 'department/closeLoading':
            return {
                ...state,
                loading: false,
            }
        case 'department/getListSuccess':
            return {
                ...state,
                departmentList: payload.list,
                departments: payload.departments
            }
        case 'department/addDepartmentSuccess':
            return {
                ...state,
                departmentList: payload.list,
                departments: payload.departments,
            }
        default:
            return state
    }

}

export default department;