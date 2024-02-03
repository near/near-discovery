import { useDefaultLayout } from '@/hooks/useLayout';
import { useSearchParams } from 'next/navigation'

import CompassApp from '@/views/Compass/home'



function Compass() {
    return <CompassApp/>
}

Compass.getLayout = useDefaultLayout;

export default Compass