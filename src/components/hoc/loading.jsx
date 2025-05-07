import Lottie from 'lottie-react';
import animationData from '../../assets/loading.json';

function withLoading(Component) {
    function ComponentWithLoading({ loading, ...props }) {
        if (loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
                </div>
            );
        }

        return <Component {...props} />;
    }
    return ComponentWithLoading;
}

export default withLoading;

