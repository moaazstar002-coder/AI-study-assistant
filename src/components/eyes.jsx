// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ReadingEyes() {
  return (
    <div className="eyes-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {[1, 2].map((i) => (
          <div 
            key={i} 
            className="eye" 
            style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: 'white', 
              borderRadius: '50%', 
              position: 'relative', 
              overflow: 'hidden', 
              border: '4px solid #8b5cf6' 
            }}
          >
            <motion.div
              className="pupil"
              style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: '#0f0a19', 
                borderRadius: '50%', 
                position: 'absolute', 
                top: '50%', 
                left: '50%',
                x: "-50%", 
                y: "-50%"
              }}
              animate={{
                x: ["-80%", "30%", "-80%"], // حركة القراءة يمين وشمال
                y: ["-50%", "-40%", "-50%"] // حركة بسيطة فوق وتحت
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        ))}
      </div>
      
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: '#a78bfa', marginTop: '24px', fontWeight: '500', letterSpacing: '2px' }}
      >
        KOZMO IS READING...
      </motion.p>
    </div>
  );
}