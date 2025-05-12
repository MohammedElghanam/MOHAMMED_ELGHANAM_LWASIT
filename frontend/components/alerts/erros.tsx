import React, {useEffect } from 'react';
import { ErrorProps } from '@/types/errorsValidation';

export default function Error({ errorMessage, setErrorMessage }: ErrorProps) {

    const handleAgree = () => {
        setErrorMessage(''); 
    };

    // useEffect( () => {
    //     setTimeout(() => setErrorMessage(''), 9000); 
    // }, [])

    return (
        <div className="w-full h-screen absolute top-0 flex justify-center items-center mx-auto bg-gray-400 bg-opacity-45">
          <div className="flex flex-col p-5 rounded-lg shadow bg-white w-96">
            <div className="flex flex-col items-center text-center">
                <div className="inline-block p-4 bg-yellow-50 rounded-full">                
                    <svg 
                        className="w-16 h-16 fill-current" 
                        xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M12 16h.008M12 8v5M3.23 7.913L7.91 3.23c.15-.15.35-.23.57-.23h7.05c.21 0 .42.08.57.23l4.67 4.673c.15.15.23.35.23.57v7.054c0 .21-.08.42-.23.57L16.1 20.77c-.15.15-.35.23-.57.23H8.47a.8.8 0 0 1-.57-.23l-4.67-4.673a.8.8 0 0 1-.23-.57V8.473c0-.21.08-.42.23-.57z">
                        </path>
                    </svg>
                </div>
              <h2 className="mt-2 font-semibold text-gray-800">
                Errors!
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                { errorMessage }
              </p>
            </div>
    
            <div className="flex items-center mt-3">
              <button
                className="flex-1 px-4 py-2 ml-2 bg-[#ff0000] hover:bg-red-600 text-white text-sm font-medium rounded-md"
                onClick={ handleAgree }
              >
                Agree
              </button>
            </div>
          </div>
        </div>
    );
}

