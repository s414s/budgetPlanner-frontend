import SideBarMenu from '../../components/theme/sideBarMenu'
import TopBar from '../../components/theme/header';

const AppSide = (props) => {

    return (
        <>
            <div className='compTopBar'>
                <TopBar />
            </div>
            <div className="compApp container-fluid row">
                <SideBarMenu />
                <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                    {props.container}
                </div>
            </div>
        </>
    )

}

export default AppSide;