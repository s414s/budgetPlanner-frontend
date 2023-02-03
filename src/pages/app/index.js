import TopMenu from '../../components/theme/topMenu'
import TopBar from '../../components/theme/header';

const App = (props) => {

    return (
        <>
            <div className='compTopBar'>
                <TopBar />
            </div>
            <div className="compApp container-fluid">
                <TopMenu />
                <div className='mt-2 ms-sm-auto px-md-4'>
                    {props.container}
                </div>
            </div>
        </>
        
    )

}

export default App;