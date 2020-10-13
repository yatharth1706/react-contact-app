import React from 'react';

const Home = () => {
    return (
        <>
            <div className = "left-sidebar">
                {/* navigation links  */}
                <header className = "projectTitle">
                    <span className = "span1">Manage</span>
                    <span className = "span2">Contacts</span>

                    <button className = "btn btn-primary mt-3"><i className="fas fa-home"></i>Create Contact</button>
                </header>
                <main className = "nav-links">

                </main>
            </div>
            <div className = "right-sidebar">

            </div>
        </>
    )
}

export default Home;