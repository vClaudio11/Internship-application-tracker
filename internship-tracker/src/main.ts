import './style.css'

const addButton = document.querySelector("#addApplication") as HTMLButtonElement;
const cancelButton = document.querySelector("#cancel") as HTMLButtonElement;
const form = document.querySelector(".form") as HTMLFormElement;
const formInner = document.querySelector(".form-inner") as HTMLDivElement;
const company = document.querySelector("#company") as HTMLInputElement;
const jobTitle = document.querySelector("#jobTitle") as HTMLInputElement;
const location = document.querySelector("#location") as HTMLInputElement;
const deadline = document.querySelector("#deadline") as HTMLInputElement;
const status = document.querySelector("#status") as HTMLSelectElement;

// Define application objects
type ApplicationStatus = "to apply" | "applied" | "interview" | "offer" | "rejected";
interface Application {
    id: number;
    company: string;
    jobTitle: string;
    location: string;
    deadline: string;
    status: ApplicationStatus;
}

const applications: Application[] = [];



// Toggle hidden class on form 
addButton.addEventListener('click', () => {
    formInner.classList.remove('hidden');
});

cancelButton.addEventListener('click', () => {
    formInner.classList.add('hidden');
});



// Add and store application data
function addApplication(app: Application): void {
    
    // Build application from user input
    
}


// Add and store application data
form.addEventListener('submit', (e) => {
    // Prevent page reload on submission 
    e.preventDefault();
    
    const newApplication: Application = {
        id: Date.now(),
        company: company.value,
        jobTitle: jobTitle.value,
        location: location.value,
        deadline: deadline.value,
        status: status.value as ApplicationStatus
    }

    applications.push(newApplication);

    formInner.classList.add("hidden");

    console.log(newApplication);
});