import Login from "../../auth/Login";

function Layout() {
    return (
        <div className="flex"> {/* Set height of the page */}
        <Login/>
        {/* Signup right image section */}
        <div className="img-side">
            <div className="img-content">
                <div className="img-intro">
                    <h2>TraceAccounting</h2>
                    <p>We are excited to help you streamline your invoicing process and efficiently manage your finances. Let’s get started.</p>
                </div>
                <div className="img-wrapper">
                    <img src="/img/dashboard.png" alt="signup" />
                </div>
            </div>
        </div>
        {/* end of signup right image section */}
        </div>
        
        
    );
}

export default Layout;