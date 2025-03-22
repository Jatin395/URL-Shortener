import React, { useState, useEffect } from 'react';
import PATH from '../Utiles/PATH';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState([]);

  const [form, setForm] = useState({
    name: "",
    long: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, long } = form;

    if (!name || !long) {
      toast.error("Please fill all inputs.");
      return;
    }

    try {
      const response = await axios.post(PATH.URL.CREATE, { name, long }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate('/');
        toast.success("URL created successfully!");
      } else {
        toast.error("Error creating URL.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the URL.");
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const fetchUrls = async () => {
    try {
      const response = await axios.post(PATH.URL.USER_URL, {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(response)
        setUrl(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);


  return (
    <>
      <div className=''>
        {/* first section */}
        <div className="flex flex-col gap-8 justify-center items-center h-96">
          <h1 className="font-bold text-xl sm:text-4xl text-center">
            Shorten Your Links, <br /> Simplify Your Sharing!
          </h1>
          <div className="text-center">
            <input
              type="text"
              className="sm:w-96 h-10 border rounded-md p-2"
              placeholder="Enter your long URL"
              name="long"
              value={form.long}
              onChange={handleChange}
            />
            <button
              onClick={handleModalToggle} // Open the modal
              className="m-2 sm:w-24 rounded-md p-1 h-10 bg-amber-300"
            >
              Shorten
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-80">
              <h2 className="text-lg font-bold mb-4">URL Name</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name input */}
                <input
                  type="text"
                  className="w-full h-10 border rounded-md p-2"
                  placeholder="Enter your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-amber-300 p-2 rounded-md"
                >
                  Submit
                </button>

                {/* Close Modal Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-2 w-full bg-red-300 p-2 rounded-md"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}

        {/* second section */}

        <div className="flex flex-col justify-center items-center mb-12 text-center">
          <h2 className='text-amber-400 text-4xl mb-8'>We have great achivement to show</h2>
          <div className="flex justify-center items-center flex-wrap shadow-xl rounded-md">
            {/* comp */}
            <div className="lg:w-72 h-40 rounded-md flex flex-col justify-center text-center">
              <div className="flex gap-2 justify-center items-center text-center">
                <i class="text-3xl ri-user-fill text-amber-400"></i>
                <p className='text-xl text-amber-400'>10 k +</p>
              </div>
              <p>Users</p>
            </div>
            <div className="lg:w-72 h-40 rounded-md flex flex-col justify-center text-center">
              <div className="flex gap-2 justify-center items-center text-center">
                <i class="text-3xl ri-user-fill text-amber-400"></i>
                <p className='text-xl text-amber-400'>100k +</p>
              </div>
              <p>User Links</p>
            </div>
            <div className="lg:w-72 h-40 rounded-md flex flex-col justify-center text-center">
              <div className="flex gap-2 justify-center items-center text-center">
                <i class="text-3xl ri-user-fill text-amber-400"></i>
                <p className='text-xl text-amber-400'>8 k +</p>
              </div>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>

        {/* third section */}
        <div className="lg:my-32 overflow-hidden">
          <div className="flex flex-col justify-center mt-12 items-center flex-wrap text-center">
            <div className="">
              <h2 className='text-4xl font-stretch-50% text-amber-400 font-semibold m-2'>One short link, infinite possibilties</h2>
              <p className='lg:text-lg font-medium'>A short link is a powerful marketing tool when you use it carefully, It is not just <br /> a link but a medium between your customer ant their desinations.</p>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-4 my-20">
              <div className="lg:w-72 h-56 flex gap-4 flex-col shadow-lg p-2 hover:shadow-xl rounded-md">
                <i class="text-3xl ri-user-fill text-yellow-400"></i>
                <h2 className='font-bold text-lg'>Smart Targeting</h2>
                <p>Personalize links based on user behavior to boost engagement and reach.</p>
              </div>
              <div className="lg:w-72 h-56 flex gap-4 flex-col shadow-lg p-2 hover:shadow-xl rounded-md">
                <i class="text-3xl ri-chat-check-fill text-yellow-400"></i>
                <h2 className='font-bold text-lg'>In-Depth Analytics</h2>
                <p>Track detailed metrics to optimize campaigns and understand your audience better.</p>
              </div>
              <div className="lg:w-72 h-56 flex gap-4 flex-col shadow-lg p-2 hover:shadow-xl rounded-md">
                <i class="text-3xl ri-macbook-fill text-yellow-400"></i>
                <h2 className='font-bold text-lg'>Digital Experience</h2>
                <p> A seamless and intuitive platform for effortless link shortening and sharing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* constact section */}
        <div className="lg:my-32 overflow-hidden">
          <div className="p-4 flex justify-center items-center text-center flex-wrap gap-8">
            <h1 className='text-3xl font-bold mr-4'>FAQS</h1>
            <div className="">
              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">How do I shorten a URL?</div>
                <div className="collapse-content text-sm">To shorten a URL, paste the link into the input field on the homepage and click "Shorten."</div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Can I track the clicks on my shortened URL?</div>
                <div className="collapse-content text-sm">Yes, you can track the number of clicks through your account dashboard after shortening the URL.</div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Do I need an account to shorten URLs?</div>
                <div className="collapse-content text-sm">No, you can shorten URLs without an account. However, creating an account allows you to track and manage your shortened links.</div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">How do I edit or delete a shortened URL?</div>
                <div className="collapse-content text-sm">To edit or delete a shortened URL, log in to your account, go to your dashboard, and select the desired URL for management options.</div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Is there a limit to how many URLs I can shorten?</div>
                <div className="collapse-content text-sm">No, you can shorten an unlimited number of URLs. However, some restrictions may apply based on the service plan you're using.</div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer section */}
        <div className="flex justify-around items-center text-center p-4 bg-gray-500 text-white h-32">
          <h2 className='text-3xl'>Linkfy</h2>
          <h2>Made with ❤️ by Jatin</h2> 
          <h2>© 2025 Linkfy. All rights reserved.</h2>
        </div>


      </div>
    </>
  );
}

export default Home;