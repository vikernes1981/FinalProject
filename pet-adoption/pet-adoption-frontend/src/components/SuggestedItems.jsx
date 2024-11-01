import React from 'react';

const SuggestedItems = () => {
  const items = [
    { 
      name: 'Food and Water Bowls', 
      description: 'Durable, non-slip bowls for food and water.',
      image: 'https://n2.sdlcdn.com/imgs/g/6/j/Petshop7-Stylish-Regular-Anti-Skid-SDL291202636-1-d0373.jpeg',
      link: 'https://www.amazon.de/s?k=food+and+water+bowls&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2Q2VH0F7E5YYQ&sprefix=food+and+water+bowls%2Caps%2C131&ref=nb_sb_noss_2' 
    },
    { 
      name: 'High-Quality Pet Food', 
      description: 'Nutritious food that meets your pet’s dietary needs.',
      image: 'http://bfs-group.eu/wp/wp-content/uploads/Petfood.jpg',
      link: 'https://www.amazon.de/s?k=High-Quality+Pet+Food&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2V3IY24T4V34M&sprefix=high-quality+pet+food%2Caps%2C129&ref=nb_sb_noss'
    },
    { 
      name: 'Leash and Collar', 
      description: 'Secure, comfortable leash and collar for safe walks.',
      image: 'http://cdn.shopify.com/s/files/1/0005/5191/1490/products/product-image-781856036_1200x1200.jpg?v=1553682632',
      link: 'https://www.amazon.de/s?k=leash+and+collar&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1U71VV1M1WAUY&sprefix=leash+and+collar%2Caps%2C120&ref=nb_sb_noss_1'
    },
    { 
      name: 'Bedding', 
      description: 'Soft, cozy bedding to make your pet feel at home.',
      image: 'https://assets.orvis.com/is/image/orvisprd/20FF0220FD_?wid=1200&src=is($object$:1-1)',
      link: 'https://www.amazon.de/s?k=dog+and+cat+beds&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=146STTH7UT88O&sprefix=dog+and+cat+beds%2Caps%2C114&ref=nb_sb_noss'
    },
    { 
      name: 'Toys', 
      description: 'Engaging toys to keep your pet entertained and mentally stimulated.',
      image: 'https://www.thesprucepets.com/thmb/A7ELQvHR6ZCy2JQwMjjZD543Jqo=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-11495316831-d3a68a67da3d4038b0d3b0d70bd01a84.jpg',
      link: 'https://www.amazon.de/s?k=pet+toys&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=JGXPJGWTPEWP&sprefix=pet+toy%2Caps%2C122&ref=nb_sb_noss_1'
    },
    { 
      name: 'Grooming Supplies', 
      description: 'Essential grooming tools like brushes, nail clippers, and shampoo.',
      image: 'https://topdogtips.com/wp-content/uploads/2016/03/Top-Best-Cheap-Dog-Grooming-Supplies.jpg',
      link: 'https://www.amazon.de/s?k=pet+grooming+supplies&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3I6U7VU04M2RD&sprefix=pet+grooming+supplie%2Caps%2C123&ref=nb_sb_noss_2'
    },
    { 
      name: 'Pet Crate or Carrier', 
      description: 'A safe crate or carrier for easy transport and training.',
      image: 'https://maarcadopt.org/wp-content/uploads/2019/11/cat-crate-training2.jpg',
      link: 'https://www.amazon.de/s?k=pet+crate+carrier&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1RA5EUN746OMA&sprefix=pet+crate+carrier%2Caps%2C113&ref=nb_sb_noss_2'
    },
  ];

  return (
    <div className="bg-gray-700 text-white py-12 px-4 rounded-lg shadow-lg text-center pt-16">
      <h2 className="text-2xl font-bold mb-6">Suggested Items to Buy Before Adopting a Pet</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mb-2 rounded-md shadow-md" />
            </a>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm">{item.description}</p>
          </li>
        ))}
      </ul>
      <a
        href="https://www.amazon.de/s?k=pets+supplies&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1ZLS0JR1IPQCS&sprefix=pets+supplies%2Caps%2C111&ref=nb_sb_noss_2"
        target="_blank"
        rel="noopener noreferrer"
      >    
        <button className="btn btn-success mt-8 transition duration-500 ease-in-out transform hover:scale-105">
          Shop Now
        </button>
      </a>
    </div>
  );
};

export default SuggestedItems;
