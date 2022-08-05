import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmployees, removeEmployees, toggleDeleted } from "./redux/employeeSlice"

function App() {
  const dispatch = useDispatch()
  const employeeList = useSelector(state => state.employee.employeeList)
  const loading = useSelector(state => state.employee.loading)
  const { deleting, deleted } = useSelector(state => state.employee)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [])

  useEffect(() => {
    if(deleted){
      dispatch(fetchEmployees())
      dispatch(toggleDeleted(false))
    }
  }, [deleted])

  const deleteEmployee = (id) => {
    dispatch(removeEmployees(id))
  }


  return (
    <div className='wrapper'>
      <h2>Employe Management</h2>

      {
        loading ? <div className='employee_list'>loading..</div> :
          <div className='employee_list'>
            <table>
              <thead>
                <tr>
                  <th align='left'>Employee Name</th>
                  <th align='left'>Employee Age</th>
                  <th align='left'>Employee Salary</th>
                </tr>
              </thead>
              {
                deleting ?
                  "Deleting..."
                  :
                  <tbody>
                    {
                      employeeList.map((val, ky) => {
                        return (
                          <tr key={ky}>
                            <td>{val.employee_name}</td>
                            <td>{val.employee_age}</td>
                            <td>{val.employee_salary}</td>
                            <td>
                              <button onClick={() => deleteEmployee(val.id)}>Delete</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
              }

            </table>
          </div>
      }

    </div>
  );
}

export default App;