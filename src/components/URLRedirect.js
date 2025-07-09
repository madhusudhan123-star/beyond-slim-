import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const URLRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    
    // Define redirect mappings for legacy URLs
    const redirectMap = {
      '/product': '/products',
      '/contact': '/contact-us',
      '/about': '/about-us',
      '/faq': '/frequently-asked-questions',
      '/blog': '/health-blog',
      '/checkout': '/secure-checkout'
    };

    // Check if current path needs to be redirected
    if (redirectMap[pathname]) {
      navigate(redirectMap[pathname], { replace: true });
    }
  }, [location.pathname, navigate]);

  return null; // This component doesn't render anything
};

export default URLRedirect;
