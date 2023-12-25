import { toast } from 'react-toastify';

import Toast from '@/components/Toast';

export default function useToast() {
  const success = (params: any) => {
    return toast(<Toast type="success" {...params} />);
  };
  const fail = (params: any) => {
    return toast(<Toast type="error" {...params} />);
  };
  const info = (params: any) => {
    return toast(<Toast type="info" {...params} />);
  };
  const loading = (params: any) => {
    return toast(<Toast type="pending" {...params} />);
  };
  return {
    success,
    fail,
    info,
    loading,
    dismiss: toast.dismiss,
  };
}
