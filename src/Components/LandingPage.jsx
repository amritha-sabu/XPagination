import { useEffect } from 'react';
import './LandingPage.css';
import { useState } from 'react';

const LandingPage = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(employeeData.length / itemsPerPage);
    const currentData = employeeData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const fetchData = async() => {
            try{
                const resposne = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
                const data = await resposne.json();
                setEmployeeData(data);
            }
            catch(error){
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (newPage) => {
        if(newPage >= 1 && newPage <= totalPages)
            setCurrentPage(newPage);
    };

    return(
        <div className="LandingPage">
            <h2>Employee Data</h2>
            <div className='data-table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='pagination'>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <p>{currentPage}</p>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default LandingPage;
