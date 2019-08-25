import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';

const WrapperLoadable = (path) => Loadable({
    loader: () => import(path),
    loading: Loading,
    // delay: 600,
    // timeout: 10000,
    // render: (loaded, props) => {
    //     let Component = loaded.namedExport;
    //     return <Component {...props}/>;
    // }
})

export default WrapperLoadable;