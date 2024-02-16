import { toast } from 'react-toastify';

import Toast from '@/components/Toast';

export default function useToast() {
  const success = (params: any) => {
    return toast(<Toast type="success" {...params} />, {
      position: "top-right"
    });
  };
  const fail = (params: any) => {
    return toast(<Toast type="error" {...params} />, {
      position: "top-right"
    });
  };
  const info = (params: any) => {
    return toast(<Toast type="info" {...params} />, {
      position: "top-right"
    });
  };
  const loading = (params: any) => {
    return toast(<Toast type="pending" {...params} />, {
      position: "top-right"
    });
  };
  return {
    success,
    fail,
    info,
    loading,
    dismiss: toast.dismiss,
  };
}
