import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';
import thunk from 'redux-thunk';
import fetchMock  from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('load course thunk', () => {
        it('should create BEGIN_API_CALL and LOAD_COURSE_SUCCESS when loading courses', ()=> {
            fetchMock.mock('*',{
                body: courses,
                headers: {'content-type':'application/json'}
            })
            const expectedAction = [
                {type: types.BEGIN_API_CALL},
                {type: types.LOAD_COURSE_SUCCESS}
            ];
            const store = mockStore({ courses: []})
            return store.dispatch(courseActions.loadCourses()).then(() => {
                expect(store.getActions()).toEqual(expectedAction);
            })
        })
    })
});

describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action',() => {
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        }
        const action = courseActions.createCourseSuccess(course);
        expect(action).toEqual(expectedAction);
    })
})