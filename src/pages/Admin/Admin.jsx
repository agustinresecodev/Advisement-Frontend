import '../Admin/Admin.css';
export const Admin = () => {
    
    return (
        <div className="container">
            
                <h3 className="d-flex justify-content-center">Administrator Panel</h3>
                <div className="col-12 content">
                    <h5>Users</h5>
                    <p>Here you can see all the users in the system</p>
                    <a href="/admin/users">See Users</a>
                </div>
                <div className="col-12 content">
                    <h5 className="d-flex">Clients</h5>
                    <p>Here you can see all the clients in the system</p>
                    <a href="/clients">See Clients</a>
                </div>
                <div className="col-12 content">
                    <h5 className="d-flex">Technicians</h5>
                    <p>Here you can see all the technicians in the system</p>
                    <button className="btn btn-primary">See Technicians</button>
                </div>
                <div className="col-12 content">
                    <h5 className="d-flex">Cases</h5>
                    <p>Here you can see all the admins in the system</p>
                    <a href='/cases'>See Cases</a>
                </div>
            </div>           
        
    )
}